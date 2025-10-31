import 'package:flutter/material.dart';
import '../config/constants.dart';
import '../services/api_service.dart';
import 'add_project_screen.dart';

class ProjectsScreen extends StatefulWidget {
  const ProjectsScreen({super.key});

  @override
  State<ProjectsScreen> createState() => _ProjectsScreenState();
}

class _ProjectsScreenState extends State<ProjectsScreen> {
  final _apiService = ApiService();
  List<dynamic> _projects = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadProjects();
  }

  Future<void> _loadProjects() async {
    setState(() => _isLoading = true);
    
    final result = await _apiService.getProjects();
    
    if (result['success']) {
      setState(() {
        _projects = result['data'] ?? [];
        _isLoading = false;
      });
    } else {
      setState(() => _isLoading = false);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(result['message'])),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('المشاريع'),
        backgroundColor: Color(AppConstants.primaryColor),
        foregroundColor: Colors.white,
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : _projects.isEmpty
              ? Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        Icons.work_off,
                        size: 80,
                        color: Colors.grey.shade300,
                      ),
                      const SizedBox(height: 16),
                      Text(
                        'لا توجد مشاريع',
                        style: TextStyle(
                          fontSize: 18,
                          color: Color(AppConstants.textSecondaryColor),
                        ),
                      ),
                      const SizedBox(height: 24),
                      ElevatedButton.icon(
                        onPressed: () async {
                          final result = await Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (_) => const AddProjectScreen(),
                            ),
                          );
                          if (result == true) _loadProjects();
                        },
                        icon: const Icon(Icons.add),
                        label: const Text('إضافة مشروع'),
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(AppConstants.primaryColor),
                          foregroundColor: Colors.white,
                        ),
                      ),
                    ],
                  ),
                )
              : RefreshIndicator(
                  onRefresh: _loadProjects,
                  child: ListView.builder(
                    padding: const EdgeInsets.all(16),
                    itemCount: _projects.length,
                    itemBuilder: (context, index) {
                      final project = _projects[index];
                      return _buildProjectCard(project);
                    },
                  ),
                ),
      floatingActionButton: _projects.isNotEmpty
          ? FloatingActionButton(
              onPressed: () async {
                final result = await Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) => const AddProjectScreen(),
                  ),
                );
                if (result == true) _loadProjects();
              },
              backgroundColor: Color(AppConstants.primaryColor),
              child: const Icon(Icons.add, color: Colors.white),
            )
          : null,
    );
  }

  Widget _buildProjectCard(Map<String, dynamic> project) {
    final statusColor = project['status'] == 'completed'
        ? Colors.green
        : project['status'] == 'in_progress'
            ? Colors.orange
            : Colors.blue;

    final statusText = project['status'] == 'completed'
        ? 'مكتمل'
        : project['status'] == 'in_progress'
            ? 'قيد التنفيذ'
            : 'جديد';

    return Card(
      margin: const EdgeInsets.only(bottom: 12),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Expanded(
                  child: Text(
                    project['title'] ?? 'بدون عنوان',
                    style: const TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 12,
                    vertical: 6,
                  ),
                  decoration: BoxDecoration(
                    color: statusColor.withOpacity(0.1),
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Text(
                    statusText,
                    style: TextStyle(
                      color: statusColor,
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                    ),
                  ),
                ),
              ],
            ),
            if (project['description'] != null) ...[
              const SizedBox(height: 8),
              Text(
                project['description'],
                style: TextStyle(
                  color: Color(AppConstants.textSecondaryColor),
                ),
                maxLines: 2,
                overflow: TextOverflow.ellipsis,
              ),
            ],
            const SizedBox(height: 12),
            Row(
              children: [
                Icon(
                  Icons.category,
                  size: 16,
                  color: Color(AppConstants.textSecondaryColor),
                ),
                const SizedBox(width: 4),
                Text(
                  project['category_name'] ?? 'غير محدد',
                  style: TextStyle(
                    fontSize: 14,
                    color: Color(AppConstants.textSecondaryColor),
                  ),
                ),
                const Spacer(),
                if (project['budget'] != null) ...[
                  Icon(
                    Icons.attach_money,
                    size: 16,
                    color: Color(AppConstants.textSecondaryColor),
                  ),
                  Text(
                    '${project['budget']} درهم',
                    style: TextStyle(
                      fontSize: 14,
                      color: Color(AppConstants.textSecondaryColor),
                    ),
                  ),
                ],
              ],
            ),
          ],
        ),
      ),
    );
  }
}
